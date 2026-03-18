import { createUploadthing, type FileRouter } from "uploadthing/next";
import { requireAdmin } from "@/lib/auth-utils";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "8MB", maxFileCount: 4 } })
    .middleware(async () => {
      try {
        await requireAdmin();
        return { permitted: true };
      } catch (error) {
        console.error("Uploadthing Auth Error:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
