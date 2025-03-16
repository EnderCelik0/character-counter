import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:shadow-textarea-error focus-visible:shadow-textarea hover:bg-neutral-100 flex field-sizing-content h-[200px] w-full rounded-md border bg-neutral-200 p-5 px-3 py-2 text-base text-neutral-700 transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-orange-500 md:text-xl dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 hover:",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
