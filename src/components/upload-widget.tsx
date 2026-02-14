import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";

export function UploadWidget() {
  return (
    <div className="bg-zinc-900 max-w-90 w-full overflow-hidden rounded-xl shadow-shape">
      <UploadWidgetHeader />
      <div className="flex flex-col gap-4 py-3">
        <UploadWidgetDropzone />
        {/* sep line */}
        <div className="h-px bg-zinc-800 border-t border-black/50 box-content" />
        <UploadWidgetUploadList />
      </div>
    </div>
  )
}
