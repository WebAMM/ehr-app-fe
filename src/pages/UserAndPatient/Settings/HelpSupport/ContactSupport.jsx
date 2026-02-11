import React from "react";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";

const ContactSupport = () => {
  return (
    <Card title="Contact Support">
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
          <Mail className="text-purple-600 w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-xs opacity-70">tracksantecontact@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
          <Phone className="text-blue-600 w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Phone</p>
            <p className="text-xs opacity-70">+236 72 23 50 53</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
          <MapPin className="text-orange-600 w-5 h-5" />
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-xs opacity-70">
              Lakouanga, Bangui, Central African Republic
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
          <MessageSquare className="text-green-600 w-5 h-5" />
          <div>
            <p className="text-sm font-medium">WhatsApp</p>
            <p className="text-xs opacity-70">+236 72 23 50 53</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactSupport;
