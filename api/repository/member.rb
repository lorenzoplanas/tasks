# encoding: utf-8
require 'redis'

module Tasker
  module Repository
    class Member
      def initialize
        self.db = Redis.new
      end

      def persist(id, data)
        db.set(id, data)
      end 

      def fetch(id)
        db.get(id)
      end

      def delete(id)
        db.del(id)
      end

      private

      attr_accessor :db
    end # Member
  end # Repository 
end # Tasker

