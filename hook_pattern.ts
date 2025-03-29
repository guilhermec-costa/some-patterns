function computeOperation() {
    const n1 = Math.random();
    const n2 = Math.random();
    return n1 * n2;
}

type HookStruct = {
    fn: VoidFunction;
}

abstract class HookManager {
    private hooks: HookStruct[] = [];

    register(hook: HookStruct) {
        this.hooks.push(hook);
    }

    unregister(hook: HookStruct) {
        this.hooks = this.hooks.filter(h => h !== hook);
    }

    async runHooks() {
        for (const { fn } of this.hooks) {
            fn()
        }
    }
}

class PreHookManager extends HookManager { }
class PostHookManager extends HookManager { }

export function executeHooks() {
    const preHookManager = new PreHookManager();
    const postHookManager = new PostHookManager();

    preHookManager.register({ fn: () => console.log("Pre Hook 1"), });
    preHookManager.register({ fn: () => console.log("Pre hook 2"), });
    postHookManager.register({ fn: () => console.log("Post hook 1"), });
    postHookManager.register({ fn: () => console.log("Post hook 2"), });

    preHookManager.runHooks();
    const computeResult = computeOperation();
    console.log("Computation result: ", computeResult);
    postHookManager.runHooks();
}
