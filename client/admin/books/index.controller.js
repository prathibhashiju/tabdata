﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('Books.IndexController', Controller);

    function Controller(BookService,UserService,$scope) {

        var vm = this;
        vm.userid=null;
        vm.books = [];
        $scope.data=[];

        initController();

        function initController() {

              UserService.GetCurrent().then(function (user) {
                vm.userid = user._id;

              });
              vm.loading = true;
            BookService.GetAll()
                 .then(function (books) {
                    vm.loading = false;
                    vm.books = books;
                    $scope.data=vm.books;
                });
        }

$(document).ready(function(){

 var table=$('#example').dataTable(



/*{
"deferLoading":[2,5],
select:true,
searching : false
}*/
);
$('.dataTables_filter input').attr("placeholder","enter..");
$('#search').click(function(e){
$('#example_filter').show();
});

/*$('a[data-toggle="tab"]').on('shown.bs.tab',function(e){

$('#example').DataTable();
});*/



});


/*$('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
    $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
} );*/

   //});


}
})();
