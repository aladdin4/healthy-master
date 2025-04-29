export class Category {
  category_title: string;
  created_at: string;
  id: number;
  updated_at: string;

  constructor (
    category_title: string = "",
    created_at: string = "",
    id: number = 0,
    updated_at: string = ""
  ) {
    this.category_title = category_title;
    this.created_at = created_at;
    this.id = id;
    this.updated_at = updated_at;
  }
}

