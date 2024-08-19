"use client";
import { useMemo, useState } from "react";
import FormSignUp from "./FormIdentity";
import { StackDivider, Text, VStack } from "@chakra-ui/react";
import lang from '@/snippet/en.json'
import { useGlobalStore } from "@/app/provider/GlobalStoreProvider";

const FormIdentityWizard = (props: FormWizardProps) => {
  const { preStep, nextStep } = useGlobalStore(
    (state) => state,
  )
  const { steps, defaultValues, onSubmit, isLoading } = props;
  const [values, setValues] = useState<Record<string, any>>({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = useMemo(
    () => steps[activeStepIndex],
    [activeStepIndex, steps]
  );
  const isLastStep = useMemo(
    () => activeStepIndex === steps.length - 1,
    [activeStepIndex, steps.length]
  );

  const goNextStep = () => {
    setActiveStepIndex((index) => (index += 1));
    nextStep()
  };

  const goPrevStep = () => {
    setActiveStepIndex((index) => (index -= 1));
    preStep()
  };

  const handleNextStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);

    if (isLastStep) {
      onSubmit(newValues);
    } else {
      goNextStep();
    }
  };

  const handleBackStep = (stepValues: Record<string, any>) => {
    const newValues = { ...values, ...stepValues };
    setValues(newValues);
    goPrevStep();
  };

  const getCopyRight = (copyright: string) => {
    const year = new Date().getFullYear().toString()
    return copyright.replace(new RegExp("%COPY_RIGHT%", "g"), year)
  }

  if (!activeStep) {
    return null;
  }

  return (
    <>
      <VStack divider={<StackDivider borderColor='gray.200' />} spacing={16}>
        <FormSignUp
          key={activeStep.id}
          fields={activeStep.fields}
          title={activeStep.title}
          description={activeStep.description}
          defaultValues={{ ...defaultValues, ...values }}
          showBackButton={!!activeStepIndex}
          isLoading={isLoading}
          onSubmit={handleNextStep}
          onBack={handleBackStep}
        />

        <VStack textAlign={'center'} color={'gray.500'} mb={10}>
          <Text fontSize={'14px'} fontWeight={600} textTransform={'uppercase'}>{lang.portal.signup.terms.title}</Text>
          <Text fontSize={'12px'}>{lang.portal.signup.terms.description}</Text>
          <Text fontSize={'14px'} mt={3}>{getCopyRight(lang.portal.signup.copyright)}</Text>
          <Text fontSize={'14px'}>{lang.portal.signup.company}</Text>
        </VStack>
      </VStack>
    </>
  );
}

export default FormIdentityWizard
