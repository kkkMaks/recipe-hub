class SearchView {
  private parentElement = document.querySelector('.search') as HTMLFormElement;
  private errorMessage = 'We could not find that recipe. Please try again!';
  private defaultMessage =
    'Start by searching for a recipe or an ingredient. Have fun!';

  getQuery() {
    return (
      this.parentElement.querySelector('.search__field') as HTMLInputElement
    ).value;
  }

  public clearInput() {
    (
      this.parentElement.querySelector('.search__field') as HTMLInputElement
    ).value = '';
  }

  public addHandlerSearch(handler: VoidFunction) {
    this.parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}

export default new SearchView();
