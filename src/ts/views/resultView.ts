import icons from 'url:../../img/icons.svg';

import View from './View';
import previewView from './previewView';
import { Recipe } from '../interfaces/interfases';

class ResultsView extends View {
  public parentElement = document.querySelector('.results') as HTMLElement;

  public generateMarkup(): string {
    console.log('generatemarkup');

    console.log(this.data);

    return this.data
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
