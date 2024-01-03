type Contact = {
  email: string;
  skype_id: string;
  test_user_credential: string;
};

export class CreateContactDto {
  customer_id: number;
  contacts: Contact[];
}
