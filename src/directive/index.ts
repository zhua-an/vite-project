import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'

export default function directive(app: any){
  app.directive('hasRole', hasRole)
  app.directive('hasPermi', hasPermi)
}