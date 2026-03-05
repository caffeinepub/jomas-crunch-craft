import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Inquiry = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compareByTimestamp(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      if (inquiry1.timestamp < inquiry2.timestamp) {
        #less;
      } else if (inquiry1.timestamp > inquiry2.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let inquiries = Map.empty<Text, Inquiry>();

  let admin : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");

  public shared ({ caller }) func submitOrderInquiry(name : Text, phone : Text, message : Text) : async () {
    let enquiry : Inquiry = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };
    inquiries.add(name.concat(Time.now().toText()), enquiry);
  };

  public query ({ caller }) func getAllEnquiries() : async [Inquiry] {
    if (caller != admin) { Runtime.trap("Only the admin can view all inquiries.") };
    inquiries.values().toArray().sort(Inquiry.compareByTimestamp);
  };
};
