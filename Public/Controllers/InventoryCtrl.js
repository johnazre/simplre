angular.module('simplreApp').controller('InventoryCtrl', function ($scope, PurchaseSvc, ClientSvc, ListingSvc, $mdDialog, $mdMedia) {


  var originatorEv;
  $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };


  $scope.ShowClosedModal = function(ev, closed) {
    $mdDialog.show({
        controller: "ClosedModalCtrl",
        templateUrl: 'Templates/closedDetailModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          closed: closed
        }
      })
  };

  $scope.showAddListingModal = function(ev) {
    $mdDialog.show({
        controller: "InventoryCtrl",
        templateUrl: 'Templates/listingInputForm.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
    });
  };

  $scope.showAddBuyerModal = function(ev) {
    $mdDialog.show({
        controller: 'InventoryCtrl',
        templateUrl: 'Templates/buyerInputForm.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
      })
  };

    $scope.ShowListingModal = function(ev, thisListing) {
      $mdDialog.show({
        controller: "ListingModalCtrl",
        templateUrl: 'Templates/listingDetailModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          listing: thisListing
        }
      })
    };

  $scope.showBuyerModal = function(ev, thisPurchase) {
    $mdDialog.show({
        controller: 'PurchaseModalCtrl',
        templateUrl: 'Templates/buyerDetailModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
          purchase: thisPurchase
        }
      })
  };

//--------------------------------------------------------//

  $scope.getListings = function() {
    ListingSvc.getListings().then(function(res) {
      // console.log(res)
      $scope.listings = res.data;
    });
  };

  $scope.getOneListing = function(id) {
    ListingSvc.getOneListing(id).then(function(response) {
      $scope.oneListing = response.data;
    });
  };

  $scope.getClients = function() {
    ClientSvc.getClients().then(function(res) {
      // console.log(res)
      $scope.clients = res.data;
    });
  };

  $scope.getClients();
  $scope.getListings();

//--------------------------------------------------------//

//--------------------------------------------------------//

  $scope.getPurchases = function() {
    PurchaseSvc.getPurchases().then(function(res) {
      // console.log(res)
      $scope.purchases = res.data;
    });
  };

  $scope.getOneListing = function(id) {
    ClientSvc.getOneClient(id).then(function(response) {
      $scope.clients = response.data;
    });
  };

  $scope.getPurchases();

//--------------------------------------------------------//

  $scope.postListing = function(ev, client, address, status, source, listPrice, salePrice, commission, units, gci, companyDollar, royalty, referralPaid, eo, mortgageCompany, titleEscrowCompany) {
    console.log(ev);
    console.log(client, address, status, source, listPrice, salePrice, commission, units, gci, companyDollar, royalty, referralPaid, eo, mortgageCompany, titleEscrowCompany);

    ListingSvc.postListing(client, address, status, source, listPrice, salePrice, commission, units, gci, companyDollar, royalty, referralPaid, eo, mortgageCompany, titleEscrowCompany).then(function(res) {
      console.log(res);
    });
  };

  $scope.postPurchase = function(ev, name, email, phone, type, buyerStatus, sellerStatus, source) {
    console.log(ev);
    PurchaseSvc.postPurchase(name, email, phone, type, buyerStatus, sellerStatus, source).then(function(res) {
      console.log(res);
    });
  };

//--------------------------------------------------------//





});
