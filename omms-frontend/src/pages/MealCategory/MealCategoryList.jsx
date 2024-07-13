import { axiosInstance } from "@/axios/axiosInstance";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useDebounced } from "@/hooks/useDebounced";
import { calculateRange } from "@/utils/range-calculator";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const retrieveData = async ({ queryKey }) => {
  //   const [, { page, limit }] = queryKey; // Destructure to get page and limit
  const params = queryKey[queryKey.length - 1];

  const response = await axiosInstance.get(`/meal-category`, {
    params: { ...params },
  });
  return response.data;
};

const MealCategoryListPage = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(2);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const query = {};
  query["limit"] = limit;
  query["page"] = page;

  /* debounced for searching delay */
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // Queries to fetch data
  const {
    data: categoriesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal-category", { ...query }],
    queryFn: retrieveData,
  });

  const { mutate } = useMutation({
    mutationFn: (id) => {
      return axiosInstance.delete(`/meal-category/${id}`);
    },
    onSuccess: () => {
      toast({
        description: "Successfully Deleted",
      });
      setIsDialogOpen("");
      refetch(); // Refetch data after successful deletion
    },
  });

  const { data: categories, meta } = categoriesData?.data || {};

  const totalPage = Math.ceil(meta?.total / limit);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  // Dialog close handler
  const handleCloseDialog = () => {
    setDeleteItemId("");
    setIsDialogOpen(false);
  };

  // Delete confirm
  const handleDeleteConfirm = () => {
    mutate(deleteItemId);
    setIsDialogOpen(false);
  };

  // Table items range
  const range = calculateRange(meta?.total, page, limit);

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary py-5">
        Meal Category List
      </h2>
      <div className="flex justify-end">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-[300px]"
          placeholder="search here..."
        />
      </div>
      <Separator className="mt-3" />
      <Table>
        <TableCaption>A list of Meal Category.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="w-full h-[150px] flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    {/* Edit Button */}
                    <Link to={`/dashboard/meal-category-list/${category?.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit2 />
                      </Button>
                    </Link>
                    {/* Delete Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setDeleteItemId(category?.id);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        {range && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                Page: {page} | {range?.start} - {range?.end} of {meta?.total}{" "}
                Users
              </TableCell>
              <TableCell className="text-right">
                <div className="space-x-2 inline-block">
                  <Button
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleNextPage}
                    disabled={page === totalPage}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>

      <DeleteDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MealCategoryListPage;
