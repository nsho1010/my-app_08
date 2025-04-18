export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: { id: string; name: string }[];
  thumbnail: { url: string; height: number; width: number };
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
};
