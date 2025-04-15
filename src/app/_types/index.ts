export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: string[];
  thumbnailUrl?: string;
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
