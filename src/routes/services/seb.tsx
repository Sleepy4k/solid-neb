import { Component, createSignal, Show, For, Suspense } from "solid-js";
import { Title, Meta, Link } from "@solidjs/meta";
import { action, useSubmission, useSearchParams, cache, createAsync } from "@solidjs/router";
import { text } from "@constants/text";
import Container from "@components/Container";
import Button from "@components/Button";
import { uploadSebAction } from "@server/action/upload.action.js";

const BASE_URL = "https://neb.benjamin4k.web.id";
const OG_IMAGE = `${BASE_URL}/src/assets/images/neb.png`;
const PAGE_TITLE = "Safe Exam Browser Bypasser | NEB - Naka Exam Bypasser";
const PAGE_URL = `${BASE_URL}/services/seb`;
const PAGE_DESC =
  "Upload your Safe Exam Browser (.seb) config file to instantly generate bypass headers — Request Hash, Config Key, Referer, and User-Agent — ready for ModHeader.";

export const uploadSeb = action(uploadSebAction, "uploadSeb");

const getSebWebToken = cache(async () => {
  "use server";
  const { encryptAuthVerify } = await import("~/lib/server/encryption.js");
  return encryptAuthVerify("WhatIsThisEvenDoingHereJustGoAway");
}, "sebWebToken");

const loadSebHeaders = cache(async (id: string, fileName: string) => {
  "use server";
  if (!id) return null;
  const { default: SebService } = await import("~/server/db/seb.service.js");
  const resultFilePath = SebService.getResultFilePath(id);
  const cachedFile = await SebService.getCachedSebFile(resultFilePath);
  if (!cachedFile) return null;
  return SebService.buildResponseFields(cachedFile, fileName);
}, "sebCachedHeaders");

const SebUpload: Component = () => {
  const submission = useSubmission(uploadSeb);
  const [searchParams, setSearchParams] = useSearchParams();

  const webToken = createAsync(() => getSebWebToken());
  const headers = createAsync(() =>
    loadSebHeaders(searchParams.id || "", searchParams.file_name || "")
  );

  const [fileName, setFileName] = createSignal("");
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  const [clientErrors, setClientErrors] = createSignal({ fileName: "", file: "" });

  let fileInputRef: HTMLInputElement | undefined;

  const validateForm = (): boolean => {
    const newErrors = { fileName: "", file: "" };
    if (!fileName().trim()) newErrors.fileName = text.upload.fileNameError;
    if (!selectedFile()) {
      newErrors.file = text.upload.fileError;
    } else if (!selectedFile()?.name.endsWith(".seb")) {
      newErrors.file = text.upload.fileTypeError;
    }
    setClientErrors(newErrors);
    return !newErrors.fileName && !newErrors.file;
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      if (file.name.endsWith(".seb")) {
        setSelectedFile(file);
        setClientErrors((prev) => ({ ...prev, file: "" }));
        if (!fileName().trim()) {
          setFileName(file.name.substring(0, file.name.lastIndexOf(".")));
        }
        if (fileInputRef && fileInputRef.files?.[0] !== file) {
          try {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.files = dataTransfer.files;
          } catch (e) {
            console.error("Failed to update input files:", e);
          }
        }
      } else {
        setClientErrors((prev) => ({ ...prev, file: text.upload.fileTypeError }));
      }
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer?.files[0] || null);
  };

  const handleCopyToClipboard = async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = val;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const handleDownloadJson = () => {
    const data = headers();
    if (!data) return;

    const formattedJson: any = { shortTitle: "", title: "", version: 2, headers: [] };
    let downloadFileName = "result";

    data.forEach((item) => {
      const name = item.name.toLowerCase();
      if (name === "file-name") {
        downloadFileName = item.value || "result";
        formattedJson.title = item.value;
        formattedJson.shortTitle = (item.value || "R").charAt(0).toUpperCase();
      } else {
        formattedJson.headers.push({
          enabled: false,
          name: item.name,
          value: item.value,
          ...(name !== "user-agent" && { appendMode: false }),
        });
      }
    });

    const blob = new Blob([JSON.stringify(formattedJson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSearchParams({ id: undefined, file_name: undefined });
    setFileName("");
    setSelectedFile(null);
    setClientErrors({ fileName: "", file: "" });
  };

  const getError = () =>
    submission.result?.error || clientErrors().fileName || clientErrors().file;

  return (
    <div class="min-h-screen py-20">
      <Title>{PAGE_TITLE}</Title>
      <Meta name="description" content={PAGE_DESC} />
      <Meta name="keywords" content="upload seb config, safe exam browser bypass headers, generate seb hashes, modheader config, request hash, config key hash" />
      <Meta name="author" content="NEB - Naka Exam Bypasser" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#ff4f00" />

      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:url" content={PAGE_URL} />
      <Meta property="og:title" content={PAGE_TITLE} />
      <Meta property="og:description" content={PAGE_DESC} />
      <Meta property="og:image" content={OG_IMAGE} />
      <Meta property="og:image:alt" content="NEB - Naka Exam Bypasser" />
      <Meta property="og:image:width" content="512" />
      <Meta property="og:image:height" content="512" />
      <Meta property="og:locale" content="en_US" />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:url" content={PAGE_URL} />
      <Meta name="twitter:title" content={PAGE_TITLE} />
      <Meta name="twitter:description" content={PAGE_DESC} />
      <Meta name="twitter:image" content={OG_IMAGE} />

      <Link rel="canonical" href={PAGE_URL} />

      <Container>
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-10">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {text.upload.title}
            </h1>
            <div class="w-16 h-1 bg-primary-50 mx-auto rounded-full mb-4" />
            <p class="text-gray-500">{text.upload.subtitle}</p>
          </div>

          <Suspense fallback={<div class="text-center py-10">Loading...</div>}>
            <Show
              when={headers()}
              fallback={
                <form
                  action={uploadSeb}
                  method="post"
                  enctype="multipart/form-data"
                  onSubmit={(e) => { if (!validateForm()) e.preventDefault(); }}
                  class="card-base p-8"
                >
                  <input type="hidden" name="web_token" value={webToken() ?? ""} />

                  <Show when={getError()}>
                    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-red-700 text-sm">{getError()}</p>
                      </div>
                    </div>
                  </Show>

                  <div class="mb-5">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {text.upload.fileNameLabel}
                    </label>
                    <input
                      type="text"
                      name="file_name"
                      value={fileName()}
                      onInput={(e) => {
                        setFileName(e.currentTarget.value);
                        setClientErrors((prev) => ({ ...prev, fileName: "" }));
                      }}
                      placeholder={text.upload.fileNamePlaceholder}
                      class={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        clientErrors().fileName ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
                      }`}
                      disabled={submission.pending}
                    />
                  </div>

                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {text.upload.fileLabel}
                    </label>
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                      class={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        isDragging()
                          ? "border-primary-500 bg-primary-50"
                          : clientErrors().file
                          ? "border-red-300 bg-red-50"
                          : "border-gray-200 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/50"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="file"
                        accept=".seb"
                        onChange={(e) => handleFileSelect(e.currentTarget.files?.[0] || null)}
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={submission.pending}
                      />

                      <Show when={!selectedFile()}>
                        <div class="space-y-3">
                          <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                            <svg class="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </div>
                          <div>
                            <p class="text-gray-700 font-medium">{text.upload.dragDropText}</p>
                            <p class="text-gray-500 text-sm mt-1">{text.upload.orText}</p>
                          </div>
                          <span class="inline-block px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                            {text.upload.chooseFile}
                          </span>
                          <div class="text-xs text-gray-400 space-y-1">
                            <p>{text.upload.supportedFormat}</p>
                            <p>{text.upload.maxFileSize}</p>
                          </div>
                        </div>
                      </Show>

                      <Show when={selectedFile()}>
                        <div class="flex items-center justify-center gap-3">
                          <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div class="text-left">
                            <p class="text-gray-900 font-medium">{selectedFile()?.name}</p>
                            <p class="text-gray-500 text-sm">
                              {((selectedFile()?.size || 0) / 1024).toFixed(2)} KB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              if (fileInputRef) fileInputRef.value = "";
                            }}
                            class="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </Show>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    disabled={submission.pending}
                    class="w-full !py-4 cursor-pointer"
                  >
                    <Show
                      when={submission.pending}
                      fallback={
                        <>
                          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          {text.upload.submitBtn}
                        </>
                      }
                    >
                      <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {text.upload.submitting}
                    </Show>
                  </Button>
                </form>
              }
            >
              <div class="card-base p-8">
                <div class="text-center mb-6">
                  <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">{text.upload.successTitle}</h2>
                  <p class="text-gray-500">{text.upload.successMessage}</p>
                </div>

                <div class="space-y-3 mb-6">
                  <For each={headers() || []}>
                    {(header) => (
                      <div class="bg-gray-50 rounded-xl p-4">
                        <div class="flex items-start justify-between gap-3">
                          <div class="flex-1 min-w-0">
                            <label class="block text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">
                              {header.name}
                            </label>
                            <p class="text-gray-900 text-sm break-all">{header.value}</p>
                          </div>
                          <button
                            onClick={() => handleCopyToClipboard(header.value || "")}
                            class="flex-shrink-0 p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors cursor-pointer"
                            title="Copy to clipboard"
                          >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </For>
                </div>

                <div class="space-y-3">
                  <Button onClick={handleDownloadJson} variant="accent" class="w-full !py-4 cursor-pointer">
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {text.upload.downloadBtn || "Download JSON for ModHeader"}
                  </Button>
                  <Button onClick={handleReset} variant="outline" class="w-full cursor-pointer">
                    {text.upload.backBtn}
                  </Button>
                </div>
              </div>
            </Show>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default SebUpload;
