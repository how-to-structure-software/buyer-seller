
class Dependency {
  constructor(onCurrentChange) {
    this.email = '';
    this.password = '';
    this.price = 0;
    this.current = 0;
    this.onCurrentChange = onCurrentChange;
  }

  goToNextStep() {
    /* eslint-disable no-console */
    console.log('goToNextStep');
    this.current = this.current === 2 ? 0 : this.current + 1;
    this.onCurrentChange(this.current);
  }
}

export default Dependency;
