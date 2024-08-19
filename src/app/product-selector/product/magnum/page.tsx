
"use client";

import { Box, Button, Container, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import lang from '@/app/snippet/en.json'
import FormSignUpWizard from "@/app/_components/forms/signup/FormSignUpWizard";
import { signupSteps } from '@/app/utils'
export default function Page() {

  // const steps: FormWizardStepProps[] = [
  //   { id: "STEP_1", fields: [{ name: "FIRSTNAME" }, { name: "LASTNAME" }] },
  //   { id: "STEP_2", fields: [{ name: "COUNTRY" }, { name: "ADDRESS" }] },
  // ];

  const defaultValues = {};
  const handleSubmit = (values: Record<string, any>) => {
    console.log(values);
  };

  return (
    <div className="w-full product-wrapper">
      <Flex className="product-header">
        <Grid w={'full'} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} px={{base: 4, md: 16}} py={10} gap={{ base: 6, md: 20 }} alignItems={'baseline'}>
          <GridItem w='100%' h='100%' display={{ base: 'none', md: 'flex' }}>
          </GridItem>
          <GridItem w='100%' h='100%'>
            <Heading as={'h1'} fontSize={'3rem'} textAlign={'center'}>MAGNUM</Heading>
            <Text textAlign={'center'}>A CreditBolt Product</Text>
          </GridItem>
          <GridItem w='100%' h='100%'>
            <Flex w={'full'} justifyContent={'end'} alignItems={'center'} gap={3}>
              <Text display={{ base: 'none', md: 'block' }}>Have an account?</Text>
              <Button as={'a'} py={3} variant={'outline'} colorScheme={'gray'} href={'/api/auth/signin'}>Login</Button>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Container maxW='8xl'>
        <FormSignUpWizard
          steps={signupSteps}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
}
