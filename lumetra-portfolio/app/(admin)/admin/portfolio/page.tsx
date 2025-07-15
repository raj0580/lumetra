"use client"
import { collection } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "@/lib/firebase";
import PageHeader from "@/components/admin/PageHeader";
import { PortfolioDataTable } from "./components/PortfolioDataTable";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";

export default function AdminPortfolioPage() {
  const [value, loading, error] = useCollection(
    collection(firestore, 'portfolio')
  );

  const data = value?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  return (
    <div>
      <PageHeader title="Portfolio Projects">
          <Button>Add New Project</Button> {/* Add Modal Logic Here */}
      </PageHeader>
      
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading...</span>}
      {value && (
        <div className="mt-8">
            <PortfolioDataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}