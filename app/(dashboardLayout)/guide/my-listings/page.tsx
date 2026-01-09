"use client";

import { Button } from "@/components/ui/button";
import { getListings, deleteListing } from "@/services/listings";
import { PlusCircle, MoreHorizontal, Pencil, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define shape of Listing data
// Ideally this comes from a shared type definition
type Listing = {
    _id: string;
    title: string;
    city: string;
    country: string;
    price: number;
    // status: string; // add if available
}

export default function GuideListingsPage() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
        const result = await getListings();
        if(result?.data) {
            setData(result.data);
        }
        setLoading(false);
    };
    fetchData();
  }, []);


  const handleDelete = async (id: string) => {
      startTransition(async () => {
          const res = await deleteListing(id);
          if(res.success) {
              toast.success("Listing deleted");
              setData(prev => prev.filter(item => item._id !== id));
          } else {
              toast.error(res.message || "Failed to delete");
          }
      });
  }

  const columns: ColumnDef<Listing>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span className="font-medium text-[#1c2434]">{row.getValue("title")}</span>,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span>{row.original.city}, {row.original.country}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-BD", {
          style: "currency",
          currency: "BDT",
        }).format(price);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            // Mock status for now if not in API
            return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Active</Badge>
        }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const listing = row.original;
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(listing._id)}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                  <Link href={`/guide/my-listings/${listing._id}`} className="flex items-center cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" /> View Details
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                  <Link href={`/guide/my-listings/${listing._id}/edit`} className="flex items-center cursor-pointer">
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(listing._id)} className="text-red-600 focus:text-red-600 cursor-pointer">
                   <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1c2434]">My Listings</h1>
            <p className="text-muted-foreground mt-1">Manage your tours and packages.</p>
        </div>
        <Button asChild className="bg-[#1c2434] hover:bg-[#2c3a50]">
            <Link href="/guide/my-listings/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Listing
            </Link>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
