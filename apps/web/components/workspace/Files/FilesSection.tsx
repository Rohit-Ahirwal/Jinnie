import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import RepositoryTree from "../FileTree/RepositoryTree";
import { apiRequest } from "@/lib/api/auth-client";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";
import { FileResponse, RepositoryTreeNode } from "@/types";

export default function FilesSection() {
  const [treeNode, setTreeNode] = useState<RepositoryTreeNode[]>([]);
  const { repository, token, tabs, openFile } = useWorkspaceStore(
    useShallow((state) => ({
      repository: state.repository,
      token: state.token,
      tabs: state.tabs,
      openFile: state.openFile,
    })),
  );

  useEffect(() => {
    async function fetchTree() {
      const response = await apiRequest<RepositoryTreeNode[]>(token, {
        method: "GET",
        url: `/github/${repository.id}/tree`,
      });
      setTreeNode(response.data);
    }
    fetchTree();
  }, [repository.id, token]);

  const onSelectFile = async (path: string) => {
    const response = await apiRequest<FileResponse>(token, {
      method: "GET",
      url: `/github/${repository.id}/file?path=${path}`,
    });

    if (response.status === 200) {
      openFile(response.data);
    }
  };

  return (
    <section className="flex h-full flex-1 flex-col min-h-0">
      <div className="space-y-3 p-4">
        <h2 className="text-sm font-semibold">Files</h2>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4 overflow-y-auto">
        <RepositoryTree tree={treeNode} selected={""} onSelect={onSelectFile} />
      </ScrollArea>
    </section>
  );
}
