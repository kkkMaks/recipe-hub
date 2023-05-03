import icons from 'url:../../img/icons.svg';

import View from './View';
import previewView from './previewView';
import { Recipe } from '../interfaces/interfases';

class BookmarksView extends View {
  public parentElement = document.querySelector(
    '.bookmarks__list'
  ) as HTMLElement;
  public errorMessage = 'No bookmarks yet. Find a recipe and bookmark it.';

  public generateMarkup(): string {
    console.log('generatemarkup');

    console.log(this.data);

    return this.data
      .map((bookMarks) => previewView.render(bookMarks, false))
      .join('');
  }
}

export default new BookmarksView();
