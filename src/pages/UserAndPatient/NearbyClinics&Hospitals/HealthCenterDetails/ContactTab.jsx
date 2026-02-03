import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ContactTab = () => {
  return (
    <Card className="" padding="lg">
      <section className="space-y-2 py-6">
        <h3 className="text-lg font-semibold text-text">About me</h3>
        <p className="text-sm text-text opacity-70 leading-relaxed">
          Dr. David Patel, a dedicated cardiologist, brings a wealth of
          experience to Golden Gate Cardiology Center in Golden Gate, CA.
          <span className="text-secondary cursor-pointer ml-1 font-medium">
            View more
          </span>
        </p>
      </section>

      {/* Working Time */}
      <section className="space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-text">Working Time</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <React.Fragment key={day}>
              <span className="text-text opacity-70">{day}</span>
              <span className="text-text text-right">00:00 AM - 00:00 PM</span>
            </React.Fragment>
          ))}

          <span className="text-text opacity-70">Sunday</span>
          <span className="text-danger text-right font-medium">Off</span>
        </div>
      </section>

      <section className="space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-text">Address</h3>
        <p className="text-sm text-text opacity-70">
          85 Preston Road, Inglewood, Maine 98380
        </p>

        {/* Map Placeholder */}
        <div className="h-32 sm:h-40 w-full rounded-lg bg-gray-100 flex items-center justify-center text-sm text-text opacity-50">
          Map Preview
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-text">
          Pay for respective Account
        </h3>

        <Card className="" padding="md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3">
            <img
              src="/avatar.png"
              alt="Bank"
              className="w-10 h-10 rounded-full "
            />
            <div>
              <p className="text-sm font-medium text-text">
                Account Name: BAWA
              </p>
              <p className="text-xs text-text opacity-60">
                Account Number: +23672906020
              </p>
            </div>
          </div>

          <Button variant="danger" fullWidth size="sm">
            Claim Request
          </Button>
        </Card>

        {/* Pay With */}
        <Card className="" padding="md">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-text">Dr Bashir</p>
              <p className="text-xs text-text opacity-60">237 6XX XXX XXX</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <Button variant="success" fullWidth>
            Pay Now
          </Button>
        </Card>
      </section>
    </Card>
  );
};

export default ContactTab;
