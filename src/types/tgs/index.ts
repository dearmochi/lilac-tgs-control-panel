export enum AdministrationRights {
  None = 0,
  WriteUsers = 1,
  RestartHost = 2,
  ChangeVersion = 4,
  EditOwnPassword = 8,
  ReadUsers = 16,
  DownloadLogs = 32,
  EditOwnOAuthConnections = 64
}

export enum InstanceManagerRights {
  None = 0,
  Read = 1,
  Create = 2,
  Rename = 4,
  Relocate = 8,
  SetOnline = 16,
  Delete = 32,
  List = 64,
  SetConfiguration = 128,
  SetAutoUpdate = 256,
  SetChatBotLimit = 512, 
  GrantPermissions = 1024,
}

export interface ServerInformationResponse {
  version?: string,
  apiVersion?: string,
  dmApiVersion?: string,
  windowsHost?: boolean,
  updateInProgress?: boolean,
  swarmServers?: any, // TODO
  oAuthProviderInfos?: any, // TODO
  minimumPasswordLength?: number,
  instanceLimit?: number,
  userLimit?: number,
  userGroupLimit?: number,
  validInstancePaths?: string[],
}

export interface PermissionSet {
  id: number,
  administrationRights: AdministrationRights | number,
  instanceManagerRights: InstanceManagerRights | number
}

export interface TokenResponse {
  bearer: string,
  expiresAt: Date
}

export interface UserResponse {
  createdBy: UserResponse,
  oAuthConnections: any, // TODO 
  permissionSet: PermissionSet,
  group: any, // TODO
  enabled: boolean,
  createdAt: Date,
  systemIdentifier: string,
  name: string,
  id: number
}