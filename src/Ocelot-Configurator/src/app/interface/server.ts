/** 网关服务器 */
interface Server {
  /** 别名 */
  Alias?: string;
  Host?: string;
  Port?: number;
  Scheme?: string;
  GrantType?: string;
  /** Administration Api路径*/
  AdministrationApiPath?: string;
}
