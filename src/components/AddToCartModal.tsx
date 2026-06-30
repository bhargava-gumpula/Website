"use client";

import { useEffect, useState } from "react";
import {
  getClassRegistrationTitle,
  parsePriceBadgeToCents,
  type ClassOffering
} from "@/data/siteContent";
import {
  type CartAudience,
  type CartDelivery,
  useCart
} from "@/context/CartContext";
import {
  formatRemainingSlots,
  formatSlotTimeLocal
} from "@/lib/formatSlotTime";
import { FormSelect } from "@/components/FormSelect";

type CalendarSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  remaining: number;
  maxCapacity: number;
};

type AddToCartModalProps = {
  classItem: ClassOffering;
  onClose: () => void;
};

export function AddToCartModal({ classItem, onClose }: AddToCartModalProps) {
  const { addItem } = useCart();
  const isGroup = classItem.format === "Group";
  const displayTitle = getClassRegistrationTitle(classItem);

  const [delivery, setDelivery] = useState<CartDelivery>("in-person");
  const [audience, setAudience] = useState<CartAudience | "">("");
  const [timeSlotId, setTimeSlotId] = useState("");
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  useEffect(() => {
    if (isGroup) setDelivery("in-person");
  }, [isGroup, classItem.slug]);

  useEffect(() => {
    let cancelled = false;

    async function loadSlots() {
      setSlotsLoading(true);
      setSlotsError(null);
      setTimeSlotId("");

      try {
        const response = await fetch(`/api/calendar/slots?classSlug=${encodeURIComponent(classItem.slug)}`);
        const data = (await response.json()) as { slots?: CalendarSlot[]; error?: string };

        if (cancelled) return;

        if (!response.ok) {
          setSlots([]);
          setSlotsError(data.error ?? "Could not load time slots.");
          return;
        }

        setSlots(data.slots ?? []);
      } catch {
        if (!cancelled) {
          setSlots([]);
          setSlotsError("Could not load time slots.");
        }
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [classItem.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const selectedSlot = slots.find((slot) => slot.id === timeSlotId);
  const canAdd = Boolean(
    audience && selectedSlot && classItem.priceBadge && parsePriceBadgeToCents(classItem.priceBadge) > 0
  );

  const handleAdd = () => {
    if (!canAdd || !audience || !selectedSlot || !classItem.priceBadge) return;

    addItem({
      classSlug: classItem.slug,
      title: displayTitle,
      priceCents: parsePriceBadgeToCents(classItem.priceBadge),
      priceLabel: classItem.priceBadge,
      delivery,
      audience,
      timeSlotId: selectedSlot.id,
      timeLabel: formatSlotTimeLocal(selectedSlot.startsAt)
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close add to cart dialog"
        className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-to-cart-title"
        className="fixed left-1/2 top-1/2 z-[75] max-h-[90vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">Add to cart</p>
            <h2 id="add-to-cart-title" className="mt-1 text-lg font-semibold text-slate-100">
              {displayTitle}
            </h2>
            {classItem.priceBadge ? (
              <p className="mt-1 text-sm text-brand-300">{classItem.priceBadge} per session</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md border border-slate-600 px-2.5 py-1 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {!isGroup ? (
            <fieldset>
              <legend className="text-sm font-medium text-slate-300">Delivery</legend>
              <div className="mt-2 flex gap-2">
                <label className="flex flex-1 cursor-pointer items-center justify-center rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-300 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-500/10 has-[:checked]:text-brand-300">
                  <input
                    type="radio"
                    name="delivery"
                    value="in-person"
                    checked={delivery === "in-person"}
                    onChange={() => setDelivery("in-person")}
                    className="sr-only"
                  />
                  In person
                </label>
                <label className="flex flex-1 cursor-pointer items-center justify-center rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-300 has-[:checked]:border-brand-400 has-[:checked]:bg-brand-500/10 has-[:checked]:text-brand-300">
                  <input
                    type="radio"
                    name="delivery"
                    value="online"
                    checked={delivery === "online"}
                    onChange={() => setDelivery("online")}
                    className="sr-only"
                  />
                  Online
                </label>
              </div>
            </fieldset>
          ) : (
            <p className="text-sm text-slate-400">In-person group class</p>
          )}

          <fieldset>
            <legend className="text-sm font-medium text-slate-300">Audience</legend>
            <FormSelect
              wrapperClassName="mt-2"
              value={audience}
              onChange={(event) => setAudience(event.target.value as CartAudience | "")}
            >
              <option value="" disabled>
                Select young or adult
              </option>
              <option value="young">Young (below high school)</option>
              <option value="adult">Adult (high school and above)</option>
            </FormSelect>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium text-slate-300">Time slot</legend>
            <p className="mt-1 text-xs text-slate-500">Times shown in your local time zone.</p>
            {slotsLoading ? (
              <p className="mt-3 text-sm text-slate-400">Loading available times...</p>
            ) : slotsError ? (
              <p className="mt-3 text-sm text-rose-300" role="alert">
                {slotsError}
              </p>
            ) : slots.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No upcoming times for this class. Check back soon.</p>
            ) : (
              <FormSelect
                wrapperClassName="mt-3"
                value={timeSlotId}
                onChange={(event) => setTimeSlotId(event.target.value)}
              >
                <option value="" disabled>
                  Select a time
                </option>
                {slots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {formatSlotTimeLocal(slot.startsAt)} — {formatRemainingSlots(slot.remaining)}
                  </option>
                ))}
              </FormSelect>
            )}
          </fieldset>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="flex-1 rounded-lg border border-brand-500 bg-brand-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export function AddToCartModalHost() {
  const { addModalClass, closeAddModal } = useCart();

  if (!addModalClass) return null;

  return <AddToCartModal key={addModalClass.slug} classItem={addModalClass} onClose={closeAddModal} />;
}
