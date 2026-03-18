import { createUploadthing, type FileRouter } from "uploadthing/next";
import { requireAdmin } from "@/lib/auth-utils";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      await requireAdmin();
      return { permitted: true };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
