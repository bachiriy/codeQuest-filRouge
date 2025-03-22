import { type CanActivateFn, Router } from "@angular/router"
import { inject } from "@angular/core"
import { Store } from "@ngrx/store"
import { selectIsAuthenticated } from "../store/auth/auth.selectors"
import { map, take } from "rxjs/operators"

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const store = inject(Store)

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true
      } else {
        router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } })
        return false
      }
    }),
  )
}

