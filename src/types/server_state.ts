export interface ServerState {
  ip?:           string;
  port?:         number;
  debug?:        Debug;
  motd?:         MOTD;
  players?:      Players;
  version?:      string;
  online:       boolean;
  protocol?:     Protocol;
  hostname?:     string;
  icon?:         string;
  eula_blocked?: boolean;
}

export interface Debug {
  ping:          boolean;
  query:         boolean;
  srv:           boolean;
  querymismatch: boolean;
  ipinsrv:       boolean;
  cnameinsrv:    boolean;
  animatedmotd:  boolean;
  cachehit:      boolean;
  cachetime:     number;
  cacheexpire:   number;
  apiversion:    number;
  dns:           DNS;
  error:         Error;
}

export interface DNS {
  srv:   Srv[];
  srv_a: SrvA[];
}

export interface Srv {
  name:     string;
  type:     string;
  class:    string;
  ttl:      number;
  rdlength: number;
  rdata:    string;
  priority: number;
  weight:   number;
  port:     number;
  target:   string;
}

export interface SrvA {
  name:     string;
  type:     string;
  class:    string;
  ttl:      number;
  rdlength: number;
  rdata:    string;
  address:  string;
}

export interface Error {
  query: string;
}

export interface MOTD {
  raw:   string[];
  clean: string[];
  html:  string[];
}

export interface Players {
  online: number;
  max:    number;
}

export interface Protocol {
  version: number;
  name:    string;
}
