# encoding: utf-8
require 'uuidtools'
require 'json'
require_relative '../repository/member'

module Tasker
  module List
    class Member
      def initialize(attributes={})
        self.attributes = { id: next_id }.merge(attributes)
        self.repository = Repository::Member.new
      end

      def persist
        repository.persist(key, attributes.to_json)
        self
      end

      def update(changed_attributes={})
        self.attributes = attributes.merge(symbolize_keys(changed_attributes))
        self
      end

      def fetch
        data = repository.fetch(key)
        raise KeyError unless data
        self.attributes = JSON.parse(data)
        self
      end

      def delete
        repository.delete(key)
        self.attributes = {}
        self
      end 

      def to_json(*args)
        attributes.to_hash.to_json
      end

      def next_id
        UUIDTools::UUID.timestamp_create.to_s
      end

      def id
        attributes.fetch(:id)
      end

      private

      attr_accessor :repository
      attr_reader   :attributes

      def key
        "lists:#{attributes.fetch(:id)}"
      end

      def attributes=(attributes)
        @attributes = symbolize_keys(attributes)
      end

      def symbolize_keys(attributes)
        Hash[attributes.map { |key, value| [key.to_sym, value] }]
      end
    end # Member
  end # List
end # Tasker

