import { useGlobalStore } from "@/app/provider/GlobalStoreProvider";
import { api } from "@/trpc/react";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

const VerifyLink = ({ 
  label, 
  isDisabled, 
  isLoading, 
  onAction 
}: { 
  label: string, 
  isDisabled: boolean, 
  isLoading: boolean, 
  onAction: (data: any) => void 
}) => {

  const { plaid } = useGlobalStore(
    (state: any) => state,
  )

  const updateVerifyStatus = api.plaid.updateVerifyStatus.useMutation({
    onSuccess: async (res: any) => {
      if (res.status === 'success') {
        onAction(res)
      }
    },
  });

  const onSuccess = useCallback(
    (public_token: string, metadata: any) => {
      updateVerifyStatus.mutate({ sessionId: metadata.link_session_id })
    },
    []
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: plaid.linkToken!,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button w={'full'} colorScheme="lime" onClick={() => open()} isDisabled={!ready || isDisabled} isLoading={updateVerifyStatus.isPending || isLoading}>
      {label}
    </Button>
  );
};

VerifyLink.displayName = "VerifyLink";

export default VerifyLink;
