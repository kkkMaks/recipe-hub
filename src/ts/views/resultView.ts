import icons from 'url:../../img/icons.svg';

import View from './View';
import previewView from './previewView';
import { Recipe } from '../interfaces/interfases';

class ResultsView extends View {
  public parentElement = document.querySelector('.results') as HTMLElement;

  public generateMarkup(): string {
    const paginationObj: Recipe[] = this.data as Recipe[];
    return paginationObj
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
