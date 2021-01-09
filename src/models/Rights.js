const Administration = {
  0: "None",
  1: "WriteUsers",
  2: "RestartHost",
  4: "ChangeVersion",
  8: "EditOwnPassword",
  16: "ReadUsers",
  32: "DownloadLogs",
  64: "EditOwnOAuthConnections",
};

const InstanceManager = {
  0: "None",
  1: "Read",
  2: "Create",
  4: "Rename",
  8: "Relocate",
  16: "SetOnline",
  32: "Delete",
  64: "List",
  128: "SetConfiguration",
  256: "SetAutoUpdate",
  512: "SetChatBotLimit",
  1024: "GrantPermissions",
};

const InstanceUser = {
  1: "ReadUsers",
  2: "WriteUsers",
  4: "CreateUsers",
};

const Repository = {
  1: "CancelPendingChanges",
  2: "SetOrigin",
  4: "SetSha",
  8: "MergePullRequest",
  16: "UpdateBranch",
  32: "ChangeCommitter",
  64: "ChangeTestMergeCommits",
  128: "ChangeCredentials",
  256: "SetReference",
  512: "Read",
  1024: "ChangeAutoUpdateSettings",
  2048: "Delete",
  4096: "CancelClone",
};

const Byond = {
  1: "ReadActive",
  2: "ListInstalled",
  4: "InstallOfficialOrChangeActiveVersion",
  8: "CancelInstall",
  16: "InstallCustomVersion",
};

const DreamMaker = {
  1: "Read",
  2: "Compile",
  4: "CancelCompile",
  8: "SetDme",
  16: "SetApiValidationPort",
  32: "CompileJobs",
  64: "SetSecurityLevel",
  128: "SetApiValidationRequirement",
};

const DreamDaemon = {
  1: "ReadRevision",
  2: "SetPort",
  4: "SetAutoStart",
  8: "SetSecurity",
  16: "ReadMetadata",
  32: "SetWebClient",
  64: "SoftRestart",
  128: "SoftShutdown",
  256: "Restart",
  512: "Shutdown",
  1024: "Start",
  2048: "SetStartupTimeout",
  4096: "SetHeartbeatInterval",
  8192: "CreateDump",
  16384: "SetTopicTimeout",
};

const Chatbot = {
  1: "WriteEnabled",
  2: "WriteProvider",
  4: "WriteChannels",
  8: "WriteConnectionString",
  16: "ReadConnectionString",
  32: "Read",
  64: "Create",
  128: "Delete",
  256: "WriteName",
  512: "WriteReconnectionInterval",
  1024: "WriteChannelLimit",
};

const Configuration = {
  1: "Read",
  2: "Write",
  4: "List",
  8: "Delete",
};

// Create the rights list for display.
const category = (name, key, rights) => ({ name: name, key: key, rights: rights });

const AllCategories = [
  category("Administration", null, Administration),
  category("Instances", null, InstanceManager),
  category("Repository", "repositoryRights", Repository),
  category("Byond", "byondRights", Byond),
  category("Deployment", "dreamMakerRights", DreamMaker),
  category("Dream Daemon", "dreamDaemonRights", DreamDaemon),
  category("Chatbots", "chatBotRights", Chatbot),
  category("Configuration", "configurationRights", Configuration),
  category("Instance Users", "instanceUserRights", InstanceUser),
];

const Rights = {
  ...AllCategories.map(category => ({ [category.key]: category })),
  ...AllCategories.map(category => // Reverse list of perm name -> bitflag to make permission check easier.
    Object.entries(category).map(kv => ({ [kv[1]]: kv[0] }))
  ),
  AllCategories: AllCategories,
  InstanceUserCategories: AllCategories.filter(category => category.key),
};
export default Rights; 