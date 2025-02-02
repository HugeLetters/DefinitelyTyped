// Type definitions for continuation-local-storage 3.2
// Project: https://github.com/othiym23/node-continuation-local-storage
// Definitions by: Jang-Ho Hwang <https://github.com/rath>
//                 Kei Son <https://github.com/heycalmdown>
//                 Dmitry Kudryavtsev <https://github.com/skwee357>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

/// <reference types="node" />

export type Context = {
    [key: string]: any;
};

export type BindCallbackFn<T> = (...args: any[]) => T;
export type RunCallbackFn<T> = (context: Context) => T;

export interface Namespace {
    readonly name: string; // Note: this is readonly because changing it does not actually rename it

    readonly active: Context; // Note: this is readonly because changing it manually will break functionality
    createContext(): Context;

    set<T>(key: string, value: T): T;
    get<T>(key: string): T | undefined;

    run<T = void>(callback: RunCallbackFn<T>): Context;
    runAndReturn<T>(callback: RunCallbackFn<T>): T;

    bind<T = void>(callback: BindCallbackFn<T>, context?: Context): BindCallbackFn<T>;
    bindEmitter(emitter: NodeJS.EventEmitter): void;

    enter(context: Context): void;
    exit(context: Context): void;
}

export function createNamespace(name: string): Namespace;
export function getNamespace(name: string): Namespace | undefined;
export function destroyNamespace(name: string): void;
export function reset(): void;

// declare namespace process {
//     var namespaces: ContinuationLocalStorage.Namespace[];
// }
