import { IPageContext } from "./getPageContext";
import { ClientStateConfig } from 'apollo-link-state';

export type IQueryParams = Record<"id",string>

export type IPageContextWithClassesAndProps<T> = Record<"pageContext",IPageContext> & Record<"classes",any> & T

export type appIniProps= Record<"Component",any/*?*/> & Record<"router",Router/*?*/> & Record<"ctx",NextContext>

export interface appIniResult<T=any> {
    iniMyAppState: ClientStateConfig, 
    pageProps:T
};

export type pageProps<T>= Record<"appState",ClientStateConfig> & T

