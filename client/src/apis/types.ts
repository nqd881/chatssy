export class UserAddress {
  country_code: string;
  state: string;
  city: string;
  street_line_1: string;
  street_line_2: string;
  postal_code: string;
}

export class UserEmail {
  email_address: string;
  is_verified: boolean;
}

export class UserEmails {
  main_email: UserEmail;
  extra_email: UserEmail;
}

export class UserProfileDetails {
  first_name: string;
  last_name: string;
  birth_date: Date;
  photo: string;
  address: UserAddress;
}

export class UserProfileBasic {
  first_name: string;
  last_name: string;
  photo: string;
}

export class UserSettingLanguage {}

export class UserSetting {}

export enum UserTypes {
  Regular = "regular",
  Admin = "admin",
}

export class UserFullInfo {
  id: string;
  type: UserTypes;
  profile: UserProfileDetails;
  setting: UserSetting;
  emails: UserEmails;
}

export enum ChatState {
  Started = "started",
  Archived = "archived",
  Deleted = "deleted",
}

export class Document {}

export class MessageTextContent {
  text: string;
}

export class MessageDocumentContent {
  document: Document;
  caption: string;
}

export type MessageContent = MessageTextContent | MessageDocumentContent;

export enum MessageContentType {
  Text = "text",
  Document = "document",
}

export class Message {
  chat_id: string;
  sender_id: string;
  reply_to: string;
  type: string;
  content: MessageContent;
  date: Date;
}

export class ChatMember {
  member_id: string;
  user_id: string;
  photo: string;
  nickname: string;
  is_admin: boolean;
  joined_date: Date;
  last_message_viewed: string;
  last_seen: Date;
}

export class Chat {
  id: string;
  title: string;
  creator_id: string;
  chat_photo: string;
  state: ChatState;
  members: ChatMember[];
  last_message: Message;
}
