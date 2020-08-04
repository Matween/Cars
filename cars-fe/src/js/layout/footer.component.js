class AppFooterController {
  constructor(AppConstants) {
    'ngInject';
    this.appName = AppConstants.appName;
  }
}

let AppFooter = {
  controller: AppFooterController,
  templateUrl: 'layout/footer.html'
};

export default AppFooter;
