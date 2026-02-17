import React, { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";

const TABS = ["All", "Doctors", "Staff"];

const membersSeed = [
  {
    id: "doc-1",
    type: "doctor",
    name: "Dr. David Patel",
    role: "Cardiologist",
    meta: "MBBS, FCP (Internal Medicine)",
    rating: 4.9,
    reviews: 245,
    patients: 254,
    email: "david.patel@trackasante.sn",
    phone: "+221 76 987 6543",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=256&h=256&fit=crop",
  },
  {
    id: "doc-2",
    type: "doctor",
    name: "Dr. Sarah Johnson",
    role: "Pediatrician",
    meta: "MBBS, MD (Pediatrics)",
    rating: 4.8,
    reviews: 198,
    patients: 198,
    email: "sarah.johnson@trackasante.sn",
    phone: "+221 77 629 0522",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=256&h=256&fit=crop",
  },
  {
    id: "doc-3",
    type: "doctor",
    name: "Dr. Emily Chen",
    role: "Dermatologist",
    meta: "MBBS, MD (Dermatology)",
    rating: 4.8,
    reviews: 124,
    patients: 176,
    email: "emily.chen@trackasante.sn",
    phone: "+221 75 237 9052",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=256&h=256&fit=crop",
  },
  {
    id: "doc-4",
    type: "doctor",
    name: "Dr. Michael Brown",
    role: "Orthopedic Surgeon",
    meta: "MBBS, MS (Orthopedics)",
    rating: 4.7,
    reviews: 87,
    patients: 156,
    email: "michael.brown@trackasante.sn",
    phone: "+221 78 239 9654",
    status: "On Leave",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=256&h=256&fit=crop",
  },
  {
    id: "staff-1",
    type: "staff",
    name: "Aminata Diallo",
    role: "Nurse",
    meta: "BSc Nursing",
    rating: null,
    reviews: null,
    patients: null,
    email: "aminata.diallo@trackasante.sn",
    phone: "+221 77 550 8265",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop",
  },
  {
    id: "staff-2",
    type: "staff",
    name: "Ousmane Sow",
    role: "Receptionist",
    meta: "Diploma in Healthcare Administration",
    rating: null,
    reviews: null,
    patients: null,
    email: "ousmane.sow@trackasante.sn",
    phone: "+221 76 372 9056",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop",
  },
];

const StatusPill = ({ status }) => {
  const isOnLeave = status?.toLowerCase() === "on leave";
  return (
    <span
      className={
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " +
        (isOnLeave
          ? "bg-warning/10 text-warning"
          : "bg-secondary/10 text-secondary")
      }
    >
      {status}
    </span>
  );
};

const MemberCard = ({ member }) => {
  const showRating = typeof member.rating === "number";

  return (
    <div className="bg-bg border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-12 h-12 rounded-lg object-cover bg-border shrink-0"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/96x96/cccccc/666666?text=Avatar";
            }}
          />

          <div className="min-w-0">
            <p className="font-semibold text-text truncate">{member.name}</p>
            <p className="text-sm text-text opacity-70 truncate">
              {member.role}
            </p>
            <p className="text-xs text-text opacity-60 truncate mt-0.5">
              {member.meta}
            </p>

            {showRating && (
              <div className="flex items-center gap-1 text-xs text-text opacity-80 mt-2">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="font-medium opacity-100">{member.rating}</span>
                <span className="opacity-70">({member.reviews} reviews)</span>
                {typeof member.patients === "number" && (
                  <>
                    <span className="opacity-40">•</span>
                    <span className="opacity-70">
                      {member.patients} patients
                    </span>
                  </>
                )}
              </div>
            )}

            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-xs text-text opacity-70">
                <Mail className="w-3.5 h-3.5 opacity-70" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text opacity-70">
                <Phone className="w-3.5 h-3.5 opacity-70" />
                <span className="truncate">{member.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="p-1.5 rounded-lg hover:bg-muted transition text-text opacity-60 hover:opacity-100"
          aria-label="More actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StatusPill status={member.status} />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-muted transition text-text opacity-60 hover:opacity-100"
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-muted transition text-red-600/80 hover:text-red-600"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ClinicMembers = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return membersSeed.filter((m) => {
      const matchTab =
        activeTab === "All" ||
        (activeTab === "Doctors" && m.type === "doctor") ||
        (activeTab === "Staff" && m.type === "staff");

      if (!matchTab) return false;
      if (!q) return true;

      const haystack = [
        m.name,
        m.role,
        m.meta,
        m.email,
        m.phone,
        m.status,
        m.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [activeTab, search]);

  const doctors = filteredMembers.filter((m) => m.type === "doctor");
  const staff = filteredMembers.filter((m) => m.type === "staff");

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Clinic Members</h1>
          <p className="text-sm text-text opacity-70">
            Manage doctors and staff members
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={Plus}>
          Add New Member
        </Button>
      </div>

      <Card padding="md" shadow="none">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="inline-flex items-center gap-1 p-1 border border-border rounded-lg bg-bg">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={
                    "px-3 py-1.5 text-xs font-medium rounded-md transition " +
                    (isActive
                      ? "bg-secondary text-white"
                      : "text-text opacity-70 hover:opacity-100")
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {(activeTab === "All" || activeTab === "Doctors") && (
        <Card padding="md" shadow="none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text">
                Doctors ({doctors.length})
              </p>
              <div className="hidden sm:flex items-center gap-2 text-xs text-text opacity-60">
                <MapPin className="w-4 h-4" />
                <span>Clinic Members</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </Card>
      )}

      {(activeTab === "All" || activeTab === "Staff") && (
        <Card padding="md" shadow="none">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text">
              Staff Members ({staff.length})
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClinicMembers;
