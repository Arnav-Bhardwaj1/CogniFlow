import { useQuery } from "@tanstack/react-query";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await fetch("/api/subscription");
      if (!res.ok) return null;
      return res.json();
    },
  });
};

export const useHasActiveSubscription = () => {
  const { data: customerState, isLoading, ...rest } = useSubscription();
  const hasActiveSubscription = customerState?.status === "active";
  return {
    hasActiveSubscription,
    subscription: customerState,
    isLoading,
    ...rest
  };
};