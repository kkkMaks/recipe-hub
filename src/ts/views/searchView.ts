class SearchView {
  private parentElement = document.querySelector('.search') as HTMLFormElement;

  getQuery() {
    return this.parentElement?.querySelector('.search__field').value;
  }

  public clearInput() {
    this.parentElement?.querySelector('.search__field').value = '';
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
