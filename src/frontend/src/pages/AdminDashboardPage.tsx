import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Instagram,
  Loader2,
  LogOut,
  Mail,
  MessageCircle,
  Package,
  Phone,
  RefreshCw,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetAllEnquiries } from "../hooks/useQueries";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accentClass: string;
  delay: number;
}

function StatCard({ label, value, icon, accentClass, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        className="rounded-2xl border"
        style={{
          background: "oklch(var(--brand-cream))",
          borderColor: "oklch(0.82 0.12 65 / 0.2)",
        }}
      >
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="font-display font-bold text-3xl text-brand-burgundy">
                {value}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl ${accentClass}`}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-28 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-48 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32 rounded" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-16 rounded-full" />
      </TableCell>
    </TableRow>
  );
}

// ─── Admin Dashboard Page ─────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const {
    data: enquiries,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetAllEnquiries();

  // Redirect if not logged in
  useEffect(() => {
    if (!isInitializing && !identity) {
      void navigate({ to: "/admin" });
    }
  }, [identity, isInitializing, navigate]);

  const handleLogout = () => {
    clear();
    void navigate({ to: "/admin" });
  };

  const totalOrders = enquiries?.length ?? 0;

  // All orders are treated as "New" since the backend doesn't have a status field
  const newOrders = totalOrders;
  const inProgress = 0;
  const completed = 0;

  // Show loading screen while identity is initializing
  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin_dashboard.loading_state"
        style={{ background: "oklch(var(--brand-parchment))" }}
      >
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-burgundy mx-auto mb-3" />
          <p className="font-body text-sm text-muted-foreground">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!identity) return null;

  const principalStr = identity.getPrincipal().toString();
  const shortPrincipal =
    principalStr.length > 20
      ? `${principalStr.slice(0, 10)}...${principalStr.slice(-6)}`
      : principalStr;

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(ellipse at 0% 0%, oklch(0.42 0.14 12 / 0.06) 0%, transparent 50%),
          oklch(var(--brand-parchment))
        `,
      }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 border-b"
        style={{
          background: "oklch(var(--brand-cream) / 0.95)",
          borderColor: "oklch(0.82 0.12 65 / 0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-brand-gold text-xl">✦</span>
              <div className="leading-tight">
                <span className="font-display font-bold text-sm text-brand-burgundy block">
                  JOMAS
                </span>
                <span className="font-display text-[0.55rem] tracking-[0.3em] text-brand-rose uppercase block">
                  CRUNCH CRAFT
                </span>
              </div>
            </a>
            {/* Admin badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.42 0.14 12 / 0.08)",
                border: "1px solid oklch(0.42 0.14 12 / 0.15)",
              }}
            >
              <ShieldCheck size={11} className="text-brand-burgundy" />
              <span className="font-body text-[0.65rem] font-semibold uppercase tracking-widest text-brand-burgundy">
                Admin
              </span>
            </div>
          </div>

          {/* Right: principal + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5">
              <User size={13} className="text-muted-foreground" />
              <span
                className="font-body text-xs text-muted-foreground truncate max-w-[140px]"
                title={principalStr}
              >
                {shortPrincipal}
              </span>
            </div>
            <Button
              data-ocid="admin_dashboard.logout_button"
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-brand-burgundy/20 text-brand-burgundy hover:bg-brand-burgundy/5 font-body text-xs"
            >
              <LogOut size={13} className="mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
                ✦ Orders Management ✦
              </p>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-burgundy">
                Orders Dashboard
              </h1>
            </div>
            <Button
              data-ocid="admin_dashboard.secondary_button"
              onClick={() => void refetch()}
              disabled={isFetching}
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-brand-gold/30 text-brand-burgundy hover:bg-brand-gold/5 font-body text-xs gap-2"
            >
              <RefreshCw
                size={13}
                className={isFetching ? "animate-spin" : ""}
              />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          data-ocid="admin_dashboard.panel"
        >
          <StatCard
            label="Total Orders"
            value={isLoading ? "—" : totalOrders}
            icon={<Package size={18} className="text-brand-burgundy" />}
            accentClass="bg-brand-burgundy/10"
            delay={0.1}
          />
          <StatCard
            label="New Orders"
            value={isLoading ? "—" : newOrders}
            icon={
              <span className="text-base leading-none font-semibold text-yellow-700">
                ✦
              </span>
            }
            accentClass="bg-yellow-100"
            delay={0.15}
          />
          <StatCard
            label="In Progress"
            value={isLoading ? "—" : inProgress}
            icon={
              <span className="text-base leading-none font-semibold text-blue-600">
                ◈
              </span>
            }
            accentClass="bg-blue-100"
            delay={0.2}
          />
          <StatCard
            label="Completed"
            value={isLoading ? "—" : completed}
            icon={
              <span className="text-base leading-none font-semibold text-green-700">
                ✓
              </span>
            }
            accentClass="bg-green-100"
            delay={0.25}
          />
        </div>

        {/* ── Orders Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "oklch(var(--brand-cream))",
              borderColor: "oklch(0.82 0.12 65 / 0.2)",
            }}
          >
            <CardHeader
              className="pb-4 border-b"
              style={{ borderColor: "oklch(0.82 0.12 65 / 0.15)" }}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="font-display font-bold text-xl text-brand-burgundy">
                  Customer Orders
                </CardTitle>
                {!isLoading && !isError && (
                  <span
                    className="font-body text-xs text-muted-foreground px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(0.42 0.14 12 / 0.06)",
                      border: "1px solid oklch(0.42 0.14 12 / 0.1)",
                    }}
                  >
                    {totalOrders} {totalOrders === 1 ? "order" : "orders"}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Error state */}
              {isError && (
                <div
                  data-ocid="admin_dashboard.error_state"
                  className="flex flex-col items-center justify-center py-16 px-4 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <AlertCircle size={24} className="text-destructive" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-brand-burgundy mb-2">
                    Unable to Load Orders
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-5 max-w-xs">
                    Something went wrong while fetching orders. Please check
                    your connection and try again.
                  </p>
                  <Button
                    onClick={() => void refetch()}
                    className="btn-burgundy h-9 px-6 rounded-xl text-xs"
                  >
                    <RefreshCw size={13} className="mr-1.5" />
                    Try Again
                  </Button>
                </div>
              )}

              {/* Loading state */}
              {isLoading && !isError && (
                <Table data-ocid="admin_dashboard.loading_state">
                  <TableHeader>
                    <TableRow
                      style={{
                        borderColor: "oklch(0.82 0.12 65 / 0.15)",
                        background: "oklch(var(--brand-parchment))",
                      }}
                    >
                      <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70">
                        Customer
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70">
                        Phone
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70">
                        Order Details
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70">
                        Date & Time
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["sk1", "sk2", "sk3", "sk4"].map((sk) => (
                      <SkeletonRow key={sk} />
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Empty state */}
              {!isLoading && !isError && totalOrders === 0 && (
                <div
                  data-ocid="admin_dashboard.empty_state"
                  className="flex flex-col items-center justify-center py-20 px-4 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: "oklch(0.82 0.12 65 / 0.1)",
                      border: "1px solid oklch(0.82 0.12 65 / 0.2)",
                    }}
                  >
                    <Package size={28} className="text-brand-gold" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl text-brand-burgundy mb-2">
                    No Orders Yet
                  </h3>
                  <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
                    When customers submit order inquiries through your website,
                    they'll appear here.
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    <a
                      href="/#order"
                      className="font-body text-xs text-brand-gold underline underline-offset-2 hover:text-brand-gold/80 transition-colors"
                    >
                      View order form
                    </a>
                    <span className="text-muted-foreground/40 text-xs">·</span>
                    <a
                      href="https://wa.me/919562369930"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs text-brand-gold underline underline-offset-2 hover:text-brand-gold/80 transition-colors"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Orders table */}
              {!isLoading && !isError && totalOrders > 0 && (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin_dashboard.table">
                    <TableHeader>
                      <TableRow
                        style={{
                          borderColor: "oklch(0.82 0.12 65 / 0.15)",
                          background: "oklch(var(--brand-parchment))",
                        }}
                      >
                        <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70 py-3">
                          Customer
                        </TableHead>
                        <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70 py-3">
                          Phone
                        </TableHead>
                        <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70 py-3">
                          Order Details
                        </TableHead>
                        <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70 py-3">
                          Date & Time
                        </TableHead>
                        <TableHead className="font-body text-xs uppercase tracking-wider text-brand-burgundy/70 py-3">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiries?.map((enquiry, index) => (
                        <TableRow
                          key={`${enquiry.name}-${enquiry.timestamp}`}
                          data-ocid={`admin_dashboard.row.${index + 1}`}
                          style={{
                            borderColor: "oklch(0.82 0.12 65 / 0.1)",
                          }}
                          className="hover:bg-brand-gold/5 transition-colors duration-150"
                        >
                          {/* Customer name */}
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-body font-bold text-sm"
                                style={{
                                  background: "oklch(0.42 0.14 12 / 0.1)",
                                  color: "oklch(0.42 0.14 12)",
                                }}
                              >
                                {enquiry.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-body font-medium text-sm text-foreground">
                                {enquiry.name}
                              </span>
                            </div>
                          </TableCell>

                          {/* Phone */}
                          <TableCell className="py-4">
                            <a
                              href={`tel:${enquiry.phone}`}
                              className="flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-brand-burgundy transition-colors group/phone"
                            >
                              <Phone
                                size={12}
                                className="shrink-0 group-hover/phone:text-brand-burgundy"
                              />
                              {enquiry.phone}
                            </a>
                          </TableCell>

                          {/* Order details */}
                          <TableCell className="py-4 max-w-xs">
                            <p
                              className="font-body text-sm text-foreground/80 leading-relaxed"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              title={enquiry.message}
                            >
                              {enquiry.message}
                            </p>
                          </TableCell>

                          {/* Timestamp */}
                          <TableCell className="py-4 whitespace-nowrap">
                            <span className="font-body text-xs text-muted-foreground">
                              {formatTimestamp(enquiry.timestamp)}
                            </span>
                          </TableCell>

                          {/* Status badge — always "New" */}
                          <TableCell className="py-4">
                            <Badge
                              data-ocid={`admin_dashboard.item.${index + 1}`}
                              className="font-body text-xs font-semibold uppercase tracking-wider rounded-full px-3"
                              style={{
                                background: "oklch(0.92 0.12 85 / 0.5)",
                                color: "oklch(0.45 0.1 70)",
                                border: "1px solid oklch(0.82 0.12 65 / 0.3)",
                              }}
                            >
                              New
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Quick Contact Footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1"
        >
          <p className="font-body text-xs text-muted-foreground">
            Customers can also reach you directly via:
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:jomascrunchcraft@gmail.com"
              className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-brand-burgundy transition-colors"
            >
              <Mail size={12} />
              jomascrunchcraft@gmail.com
            </a>
            <a
              href="https://wa.me/919562369930"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-brand-gold transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/jomas_world_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-brand-rose transition-colors"
            >
              <Instagram size={12} />
              @jomas_world_
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
