export interface singleNew {
  category: string;
  date: string;
  header: string;
  subheader: string;
  author: string;
  id: number;
  main_image: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  main_text: string;
  sub_text_0: string;
  sub_text_1: string;
  video: string;
}

export interface postNew {
  category: string;
  header: string;
  subheader: string;
  author: string;
  main_image: string | null;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  main_text: string;
  sub_text_0: string;
  sub_text_1: string;
  video: string | null;
}
