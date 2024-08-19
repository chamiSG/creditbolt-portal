'use server'
 
import { ID_VER_TEMPLATE, plaidClient } from '../utils/plaid';
 
export async function createVerificationCaller(input: any) {
  try {
    const response = await plaidClient.identityVerificationCreate({
      is_shareable: false,
      template_id: 'idvtmp_bynux4SNZbnWSv',
      is_idempotent: true,
      user: {
        client_user_id: input.userId,
        name: { family_name: input.lastname, given_name: input.firstname },
        address: {
          street: "123 Main St.",
          city: "Pawnee",
          country: "US",
          region: "IN",
          postal_code: "46001",
        },
        date_of_birth: "1975-01-18",
      },
      gave_consent: false
    });
    const idvSession = response.data.id;

    return idvSession

  } catch (error) {
    console.error("Plaid API Error:", error.response?.data || error.message);
    throw new Error(error);

  }
}