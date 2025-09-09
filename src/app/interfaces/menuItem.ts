export interface MenuItem {
  ID: number;
  title: string;
  url: string;
  object_slug: string;
  classes?: string[];
  menu_item_parent?: string;
}