import dotenv from "dotenv";
dotenv.config();

export const fromEnv = (variableName: string): string => {
  const value = process.env[variableName];
  if ([undefined, ""].includes(value)) {
    throw new Error(`Environment variable not defined: ${variableName}`);
  }
  return value as string;
};
