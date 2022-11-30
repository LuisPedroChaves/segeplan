import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowForRoles]'
})
export class ShowForRolesDirective implements OnInit {

  @Input('appShowForRoles') allowedRoles: string[]

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {

    const SESSION = localStorage.getItem('segeplan-session')

    if (SESSION) {

      const ROLE = JSON.parse(SESSION).usuario.role;

      if (this.allowedRoles.includes(ROLE)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }else {
        this.viewContainerRef.clear()
      }

    }

  }

}
