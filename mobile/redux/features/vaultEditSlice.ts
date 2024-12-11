import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GnoNativeApi, KeyInfo } from "@gnolang/gnonative";
import { ThunkExtra } from "@/providers/redux-provider";
import { RootState } from "../root-reducer";

export interface VaultState {
  vaultToEdit: KeyInfo | undefined;
  keyinfosChains?: Map<string, string[]>;
}

const initialState: VaultState = {
  vaultToEdit: undefined,
};

interface SaveChangesParam {
  newName: string;
}

interface DeleteVaultParam {
  vault: KeyInfo;
}

export const deleteVault = createAsyncThunk<boolean, DeleteVaultParam, ThunkExtra>("vault/deleteVault", async (param, thunkAPI) => {
  const gnonative = thunkAPI.extra.gnonative as GnoNativeApi;
  const { vault } = param;

  await gnonative.deleteAccount(vault.name, undefined, true);

  return true
})

export const saveChanges = createAsyncThunk<boolean, SaveChangesParam, ThunkExtra>("vault/saveChanges", async (param, thunkAPI) => {
  const { newName } = param;

  const gnonative = thunkAPI.extra.gnonative as GnoNativeApi;

  // TODO: Implement the save changes logic using the gnonative.

  return true;
});

/**
 * Check if each key is present in which chain.
 * */
export const checkForKeyOnChains = createAsyncThunk<Map<string, string[]>, void, ThunkExtra>("vault/checkForKeyOnChains", async (_, thunkAPI) => {
  const gnonative = thunkAPI.extra.gnonative as GnoNativeApi;

  const keyinfos = await gnonative.listKeyInfo();
  const chains = (thunkAPI.getState() as RootState).signUp.chainsAvailable;

  const keyinfosChains = new Map<string, string[]>();

  for (const chain of chains) {
    await gnonative.setChainID(chain.chainId);
    await gnonative.setRemote(chain.gnoAddress);

    for (const key of keyinfos) {
      console.log(`Checking key ${key.name} on chain ${chain.chainName}`);
      const queryResponse = await hasCoins(gnonative, key.address);
      console.log(`Key ${key.name} on chain ${chain.chainName} has coins: ${queryResponse}`);

      keyinfosChains.has(key.name) ? keyinfosChains.get(key.name)?.push(chain.chainId) : keyinfosChains.set(key.name, [chain.chainId]);
    }
  }
  return keyinfosChains;
});

const hasCoins = async (gnonative: GnoNativeApi, address: Uint8Array) => {
  try {
    console.log("checking if user has balance");
    const balance = await gnonative.queryAccount(address);
    console.log("account balance: %s", balance.accountInfo?.coins);

    if (!balance.accountInfo) return false;

    const hasCoins = balance.accountInfo.coins.length > 0;
    const hasBalance = hasCoins && balance.accountInfo.coins[0].amount > 0;

    return hasBalance;
  } catch (error: any) {
    console.log("error on hasBalance", error["rawMessage"]);
    if (error["rawMessage"] === "invoke bridge method error: unknown: ErrUnknownAddress(#206)") return false;
    return false;
  }
};

export const vaultSlice = createSlice({
  name: "vault",
  initialState,
  reducers: {
    setVaultToEdit: (state, action) => {
      state.vaultToEdit = action.payload.vault;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkForKeyOnChains.fulfilled, (state, action) => {
      console.log("checkForKeyOnChains.fulfilled", action.payload);
      state.keyinfosChains = action.payload;
    })
  },
  selectors: {
    selectVaultToEdit: (state) => state.vaultToEdit,
  },
});

export const { setVaultToEdit } = vaultSlice.actions;

export const { selectVaultToEdit } = vaultSlice.selectors;
