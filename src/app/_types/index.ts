export type Post = {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  postCategories: PostCategory[];
};

export type PostCategory = {
  id: number;
  postId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type PostRequest = {
  title: string;
  content: string;
  thumbnail: string;
  categories: { id: number }[];
};

export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type GetPostsResponse = {
  result: string;
  posts: Post[];
};

export type GetCategoryResponse = {
  result: string;
  categories: Category[];
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
