
"use client";

import { Suspense, useEffect } from "react";
import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { getCopyRight } from '@/app/utils'
import { api } from "@/trpc/react";
import { useGlobalStore } from "@/app/provider/GlobalStoreProvider";
import { useSearchParams } from 'next/navigation'
import lang from '@/snippet/en.json'
import Card from "@/app/_components/card/Card";
import VerifyLink from "@/app/_components/plaid/VerifyLink";
import { redirectPath } from "../actions/redirect";

export default function Page() {
  const { info, setLinkToken, setHostedLinkURL, resetPlaidStore } = useGlobalStore(
    (state: any) => state,
  )

  const generateLinkTokenForIdv = api.plaid.generateLinkTokenForIdv.useMutation({
    onSuccess: async (res: any) => {
      setLinkToken(res.link_token)
      setHostedLinkURL(res.hosted_link_url)
    },
  });

  const handleVerifyAction = (event: any) => {
    resetPlaidStore()
    redirectPath(`/payment`)
  }

  useEffect(() => {
    if (!info.id || !info.email) {
      return
    }
    generateLinkTokenForIdv.mutate({ userId: info.id, email: info.email })
  }, [info])

  return (
    <Suspense>
      <Container maxW='8xl' display={'flex'} justifyContent={'center'}>
        <Card maxW='lg' py={16} px={10} h={'full'}>
          <VStack mb={6} alignItems={'start'}>
            <Heading as={'h2'} fontSize={'1.75rem'}>{lang.portal.identity.step1.title}</Heading>
            <Text color={'gray.600'}>{lang.portal.identity.step1.description}</Text>
          </VStack>
          <Flex w={'full'} mt={6} justifyContent={'space-between'} gap={4}>
            <VerifyLink 
            label="Start Verification"
            isDisabled={generateLinkTokenForIdv.isPending} 
            isLoading={generateLinkTokenForIdv.isPending}
            onAction={handleVerifyAction}
            />
          </Flex>
        </Card>
      </Container>
    </Suspense>
  );
}
