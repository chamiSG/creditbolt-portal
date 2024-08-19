
"use client";

import { Box, Container, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import lang from '@/snippet/en.json'
import ProductCard from "@/app/_components/card/ProductCard";
import ProductPriceCard from "@/app/_components/card/ProductPriceCard";
import { Header } from "@/app/_components/header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="w-full">
        <div className="pt-selector-wrapper">
          <div className="pt-title-wrapper">
            <Box className="pt-title-wrapper-top" display={'flex'} justifyContent={'center'}>
              <Flex className="pt-title" w={'full'} py={'40px'} gap={2} justifyContent={'center'}>
                <Heading>What is your Credit Goal?</Heading>
              </Flex>
            </Box>
          </div>
          <Container maxW='8xl'>
            <Grid templateColumns='repeat(3, 1fr)' gap={{ base: 6, md: 32 }}>
              <GridItem w='100%' h='100%'>
                <ProductCard lang={lang.portal.product.magnum} variant="orange" path={'/product-selector/product/magnum?product_option=magnum'} />
              </GridItem>
              <GridItem w='100%' h='100%'>
                <ProductCard lang={lang.portal.product.revolv} variant="sky" path={'/product-selector/product/revolv?product_option=magnrevolvum'} />
              </GridItem>
              <GridItem w='100%' h='100%'>
                <ProductCard lang={lang.portal.product.instal} variant="lime" path={'/product-selector/product/instal?product_option=instal'} />
              </GridItem>
            </Grid>
          </Container>
          <Box h={'200px'} bg={'lime.500'} zIndex={0} mt={'-100px'}></Box>
          <Container maxW='8xl' my={20}>
            <Grid templateColumns='repeat(3, 1fr)' gap={{ base: 6, md: 32 }}>
              <GridItem w='100%' h='100%'>
                <ProductPriceCard lang={lang.portal.product.magnum} variant="orange" path={'/product-selector/product/magnum?product_option=magnum'} />
              </GridItem>
              <GridItem w='100%' h='100%'>
                <ProductPriceCard lang={lang.portal.product.revolv} variant="sky" path={'/product-selector/product/revolv?product_option=revolv'} />
              </GridItem>
              <GridItem w='100%' h='100%'>
                <ProductPriceCard lang={lang.portal.product.instal} variant="lime" path={'/product-selector/product/instal?product_option=instal'} />
              </GridItem>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
}