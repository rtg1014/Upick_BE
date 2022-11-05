export interface Posting {
  title: string;
  content: string;
  tags?: string[];
}

export interface CreatePostingDto extends Posting {
  merchandiseIds: number[];
}
