import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './services/category.service';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'POS Market';
    categories: any[];
    cartvalue = 0;
    categoryselect:any = {};
    isMenu: boolean = false;
    blockMenu: boolean = false;

    constructor(private categoryService: CategoryService, private router: Router) {}

    ngOnInit() {
        this.checkCartvalue();
        this.categoryService.list()
            .then((data: any) => {
                if (data.result == "SUCCESS") {
                    this.categories = data.data.marketplaceCategories;
                }
            });
    }

    @HostListener('window:click', ['$event'])
    windowClick(e: any) {        
        if (this.isMenu && this.blockMenu && $(e.target).closest('aside').length == 0) {
            this.isMenu = false;
            this.blockMenu = false;
        }
    }

    menu() {
        this.isMenu = true;
        this.blockMenu = false;

        let self = this;
        setTimeout(function() {
            self.blockMenu = true;
        }, 100);
        // if(this.popup){
        //     $('aside').addClass('active');
        // }

        // setTimeout(function () {
        //     $(document).bind('click', (e: any) => {
        //         if (!$(e.target).closest('aside').length) {
        //             $(document).unbind('click');
        //             $('aside').removeClass('active');
        //         }
        //     });
        // }, 0);
    }
    backtohome(){
         this.router.navigate(['/home/1']);
         this.checkCartvalue();
         $('aside').removeClass('active');
    }
    gotocart(){
         this.router.navigate(['/order']);
         this.checkCartvalue();
    }
    gotosearch(){
         this.router.navigate(['/search']);
         this.checkCartvalue();
    }    
    selectCatagory(c:any){
        //sessionStorage.setItem('catagory',c.code.toString());
        // sessionStorage.setItem('catagory',JSON.stringify(c));
        // this.categoryselect = c;
        // $('aside').removeClass('active');
        //location.reload();

        if (!c) {
            c = 'ALL';
        }

        this.router.navigate(['/category', c]);
    }
    openCatagory(){
        //sessionStorage.setItem('catagory',c.code.toString());
        this.router.navigate(['/homecategory']);
        //location.reload();
    }
    openlogin(){
         this.router.navigate(['/login']);       
    }
    checkCartvalue(){
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        if(cart == null){
            this.cartvalue = 0;
        }
        else{
            this.cartvalue = cart.length;
        }
    }
    backtobefore(){
        window.history.back();
    }
    viewtable = true;
    changeview(){
        this.viewtable = !this.viewtable;
        return this.viewtable;
    }
}
